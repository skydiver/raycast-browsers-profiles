import { ActionPanel, Detail, List, Action } from "@raycast/api";

import { getFirefoxProfiles } from "./lib/firefox";
import { getChromiumProfiles } from "./lib/chromium";

export default function Command() {
  const chromiumProfiles = getChromiumProfiles();
  const firefoxProfiles = getFirefoxProfiles();

  const profiles = [...chromiumProfiles, ...firefoxProfiles];

  return (
    <List>
      {profiles.map((profile, index) => (
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
