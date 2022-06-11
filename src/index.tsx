import { ActionPanel, Detail, List, Action } from "@raycast/api";

import { getFirefoxProfiles } from "./lib/firefox";

export default function Command() {
  const firefoxProfiles = getFirefoxProfiles();

  return (
    <List>
      {firefoxProfiles.map((profile, index) => (
        <List.Item
          key={`firefox-profile-${index}`}
          icon={{ source: `icons/${profile.icon}` }}
          title={profile.name}
          actions={
            <ActionPanel>
              <Action.Push title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
