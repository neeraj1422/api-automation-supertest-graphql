import fs from 'fs';

// Helper to offset ISO date by milliseconds
function offsetDate(start: string, offsetMs: number): string {
    return new Date(new Date(start).getTime() + offsetMs).toISOString();
}

interface MochawesomeTest {
    title: string;
    state: string;
    duration: number;
    pending?: boolean;
}

interface MochawesomeSuite {
    tests: MochawesomeTest[];
    suites: MochawesomeSuite[];
}

interface MochawesomeResult {
    suites: MochawesomeSuite[];
}

interface MochawesomeJSON {
    stats: {
        start: string;
        end: string;
    };
    results: MochawesomeResult[];
}

function extractXrayResults(mochaJsonPath: string, outputPath = './xray-execution.json') {
    const raw = fs.readFileSync(mochaJsonPath, 'utf-8');
    const mocha: MochawesomeJSON = JSON.parse(raw);

    const executionStart = mocha.stats.start;
    const executionEnd = mocha.stats.end;

    const tests: any[] = [];

    mocha.results.forEach(result => {
        result.suites.forEach(suite => {
            suite.tests.forEach(test => {
                const match = test.title.match(/(TEST-\d+)/i);
                if (!match) return;

                const testKey = match[1];
                const status = test.state === 'passed' ? 'PASSED' :
                    test.state === 'failed' ? 'FAILED' :
                        test.pending ? 'TODO' : 'UNKNOWN';

                const start = offsetDate(executionStart, 0);
                const finish = offsetDate(executionStart, test.duration || 1000);

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
    console.log(`✅ Xray execution JSON created: ${outputPath}`);
}

// CLI usage
if (require.main === module) {
    const inputFile = process.argv[2];
    if (!inputFile) {
        console.error('Usage: ts-node convert-to-xray.ts <mochawesome.json>');
        process.exit(1);
    }

    extractXrayResults(inputFile);
}
