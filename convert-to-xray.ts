import fs from 'fs';

// Remove milliseconds from ISO timestamp
function toSimpleUtcIso(date: string | Date): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        throw new Error(`Invalid date: ${date}`);
    }
    return d.toISOString().split('.')[0] + 'Z';
}

// Map status to Xray Server/DC format
function mapStatus(state: string): string {
    return state === 'passed' ? 'PASS' :
        state === 'failed' ? 'FAIL' :
            'TODO';
}

function extractXrayResults(
    mochaJsonPath: string,
    outputPath = './xray-execution.json'
) {
    const raw = fs.readFileSync(mochaJsonPath, 'utf-8');
    const mocha = JSON.parse(raw);

    const executionStart = toSimpleUtcIso(mocha.stats.start);
    const executionEnd = toSimpleUtcIso(mocha.stats.end);

    const tests: any[] = [];

    mocha.results.forEach((result: any) => {
        result.suites.forEach((suite: any) => {
            suite.tests.forEach((test: any) => {
                const match = test.title.match(/(TEST-\d+)/i);
                if (!match) return;

                const testKey = match[1];
                const status = mapStatus(test.state);

                const start = executionStart;
                const finish = toSimpleUtcIso(new Date(mocha.stats.start).getTime() + (test.duration || 1000));

                tests.push({
                    testKey,
                    status,
                    comment: `Executed by Mocha test: ${test.title}`,
                    start,
                    finish,
                    evidence: []
                });
            });
        });
    });

    const xrayResult = {
        tests,
        info: {
            summary: "Mocha Automated Test Execution - GraphQL",
            description: "Imported from Mochawesome JSON",
            startDate: executionStart,
            finishDate: executionEnd,
            testEnvironments: ["TEST"]
        }
    };

    fs.writeFileSync(outputPath, JSON.stringify(xrayResult, null, 2));
    console.log(`✅ Xray DC execution JSON created: ${outputPath}`);
}

// CLI usage: node convert-to-xray.ts <mochawesome.json>
if (require.main === module) {
    const inputFile = process.argv[2];

    if (!inputFile) {
        console.error('❌ Usage: ts-node convert-to-xray.ts <mochawesome.json>');
        process.exit(1);
    }

    extractXrayResults(inputFile);
}
