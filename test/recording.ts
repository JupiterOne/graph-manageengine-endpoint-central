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
  });
}

function redact(entry): void {
  mutations.unzipGzippedRecordingEntry(entry);

  if (entry.request.url) {
    entry.request.url = entry.request.url
      .replace(/refresh_token=([a-z0-9.]+)&/g, 'refresh_token=[REDACTED]&')
      .replace(/client_secret=([a-z0-9.]+)&/g, 'client_secret=[REDACTED]&')
      .replace(/client_id=([a-z0-9.]+)&/g, 'client_id=[REDACTED]&');
  }
}
