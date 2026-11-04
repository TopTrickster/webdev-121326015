
const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');

// The lectures, read once when the server starts.
const lectures = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'lectures.json'), 'utf8')
);

// A tool result: one text part, and whether the tool failed.
function textResult(id, text, isError) {
  return {
    jsonrpc: '2.0',
    id: id,
    result: {
      content: [{ type: 'text', text: text }],
      isError: isError
    }
  };
}

// The tools this server offers.
const tools = [
  {
    name: 'find_lecture',
    description: 'Returns information.',
    inputSchema: {
      type: 'object',
      properties: {
        number: {
          type: 'integer',
          description: 'Lecture number, 1 to 12'
        }
      },
      required: ['number'],
    },
  },
  {
    name: 'count_lectures',
    description: 'Count the total number of lectures in the course. Use when asked how many lectures the course has.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
  },
];

// Print one reply as one line of JSON on stdout.
function send(reply) {
  process.stdout.write(JSON.stringify(reply) + '\n');
}

// Decide what to answer. Return the reply, or null to answer nothing.
function handle(msg) {
  if (msg.method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        protocolVersion: msg.params.protocolVersion,
        capabilities: { tools: {} },
        serverInfo: {
          name: 'lectures',
          version: '0.1.0'
        },
      },
    };
  }

  if (msg.method === 'notifications/initialized') {
    return null;
  }

  if (msg.method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: { tools: tools }
    };
  }

  if (msg.method === 'tools/call') {
    const name = msg.params.name;
    const args = msg.params.arguments || {};

    if (name === 'find_lecture') {
      const lecture = lectures.find((l) => l.number === args.number);

      if (!lecture) {
        // The lecture does not exist.
        return textResult(
          msg.id,
          'There is no lecture ' + args.number + '. The course has lectures 1 to 12.',
          true
        );
      }

      return textResult(
        msg.id,
        'Lecture ' + lecture.number + ': ' + lecture.title + '. Topics: ' + lecture.topics,
        false
      );
    }

    if (name === 'count_lectures') {
      return textResult(
        msg.id,
        'The course has ' + lectures.length + ' lectures.',
        false
      );
    }

    // Unknown tool: protocol error -32602.
    return {
      jsonrpc: '2.0',
      id: msg.id,
      error: {
        code: -32602,
        message: 'Unknown tool: ' + name
      }
    };
  }

  if (msg.id !== undefined) {
    // Unknown method: protocol error -32601.
    return {
      jsonrpc: '2.0',
      id: msg.id,
      error: {
        code: -32601,
        message: 'Unknown method: ' + msg.method
      }
    };
  }

  return null;
}

const lines = readline.createInterface({
  input: process.stdin
});

lines.on('line', (line) => {
  console.error('got: ' + line);
  const reply = handle(JSON.parse(line));
  if (reply) send(reply);
});
