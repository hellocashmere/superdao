const audienceNames: Readonly<Record<string, string>> = {
  "cashmere-ton": "cashmere.ton",
  new: "New audience",
};

/** Returns the display name associated with an audience identifier. */
export function getAudienceName(audienceID: string) {
  const knownName = audienceNames[audienceID];

  if (knownName) {
    return knownName;
  }

  const readableName = audienceID.replace(/[-_]+/g, " ").trim();

  return readableName ? `${readableName.charAt(0).toUpperCase()}${readableName.slice(1)}` : "New audience";
}
