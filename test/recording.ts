import {
  setupRecording,
  Recording,
  SetupRecordingInput,
  mutations,
} from '@jupiterone/integration-sdk-testing';

export { Recording };

export function setupProjectRecording(
  input: Omit<SetupRecordingInput, 'mutateEntry'>,
): Recording {
  return setupRecording({
    ...input,
    redactedRequestHeaders: ['Authorization'],
    redactedResponseHeaders: ['set-cookie'],
    mutateEntry: (entry) => {
      redact(entry);
    },
    options: {
      matchRequestsBy: {
        url: {
          query: false,
        },
      },
    },
  });
}

function redact(entry): void {
  mutations.unzipGzippedRecordingEntry(entry);
  const queryStringsToRedact = ['refresh_token', 'client_secret', 'client_id'];
  if (entry.request.queryString) {
    for (const queryString of queryStringsToRedact) {
      const refreshTokenIndex = entry.request.queryString.findIndex(
        (param) => param.name === queryString,
      );
      if (refreshTokenIndex !== -1) {
        entry.request.queryString[refreshTokenIndex] = {
          name: queryString,
          value: '[REDACTED]',
        };
      }
    }
  }
  if (entry.request.url) {
    for (const queryString of queryStringsToRedact) {
      entry.request.url = entry.request.url.replace(
        new RegExp(`${queryString}=([\\w.]+)&`, 'g'),
        `${queryString}=[REDACTED]&`,
      );
    }
  }
  if (entry.response.content.text) {
    entry.response.content.text = entry.response.content.text.replace(
      new RegExp(`\\"access_token\\":\\"([\\w.]+)\\"`, 'g'),
      `"access_token":"[REDACTED]"`,
    );
  }
}
