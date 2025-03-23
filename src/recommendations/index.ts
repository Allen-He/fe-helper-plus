import type { ExtensionContext, QuickPickItem } from "vscode";
import { window, commands, extensions, Uri, env, ThemeIcon } from "vscode";
import { recommendedPlugins } from "./plugins";

function recommendationsCommandHandle() {
  return async () => {
    const allExtensions = extensions.all.map((ext) => ext.id);

    const quickPick = window.createQuickPick();
    quickPick.items = recommendedPlugins.map((plugin) => ({
      label: plugin.id,
      description: plugin.displayName,
      detail: plugin.description,
      buttons: [
        {
          iconPath: new ThemeIcon('link-external'),
          tooltip: "View on Marketplace",
        },
      ],
    }));
    quickPick.canSelectMany = true;
    quickPick.selectedItems = quickPick.items; // 默认全选
    quickPick.placeholder = "Select plugins to install (default: all selected)";
    quickPick.onDidTriggerItemButton((e) => {
      if (e.button.tooltip === 'View on Marketplace')  {
        env.openExternal(Uri.parse(`https://marketplace.visualstudio.com/items?itemName=${e.item.label}`));
      }
    });

    quickPick.show();

    const selectedPlugins = await new Promise<readonly QuickPickItem[]>((resolve) => {
      quickPick.onDidAccept(() => {
        resolve(quickPick.selectedItems);
        quickPick.hide();
      });
      quickPick.onDidHide(() => resolve([]));
    });

    if (!selectedPlugins || selectedPlugins.length === 0) {
      window.showInformationMessage("No plugins selected for installation.");
      return;
    }

    const confirm = await window.showWarningMessage(
      `You are about to install ${selectedPlugins.length} plugin(s). Proceed?`,
      { modal: true },
      "Yes"
    );

    if (confirm === "Yes") {
      const installedPlugins: string[] = [];
      const alreadyInstalledPlugins: string[] = [];

      const installPromises = selectedPlugins.map(async (plugin) => {
        if (allExtensions.includes(plugin.label)) {
          alreadyInstalledPlugins.push(plugin.label);
        } else {
          try {
            await commands.executeCommand("workbench.extensions.installExtension", plugin.label);
            installedPlugins.push(plugin.label);
          } catch (error) {
            window.showErrorMessage(`Failed to install: ${plugin.label}`);
          }
        }
      });
      await Promise.all(installPromises);

      window.showInformationMessage(`Installed plugins (${installedPlugins.length})  |  Already installed plugins (${alreadyInstalledPlugins.length})`);
    }
  };
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("feHelperPlus.installRecommendedPlugins", recommendationsCommandHandle())
  );
}

export function deactivate() {
  // ...
}
