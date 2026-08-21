var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ReadAtPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  paths: [],
  // ★ 改为空数组，表示默认监控整个 Vault
  fieldName: "read_at",
  writeOnOpen: true,
  extraFields: ""
  // ★ 默认完全为空，绝无 ai_label_status 或 icon
};
var ReadAtPlugin = class extends import_obsidian.Plugin {
  settings;
  async onload() {
    await this.loadSettings();
    this.registerEvent(
      this.app.workspace.on("file-open", this.onFileOpen.bind(this))
    );
    this.addSettingTab(new ReadAtSettingTab(this.app, this));
  }
  async onFileOpen(file) {
    if (!file || !this.settings.writeOnOpen) return;
    const targetPaths = this.settings.paths.filter((p) => p.trim());
    if (targetPaths.length > 0) {
      const isInPath = targetPaths.some((p) => file.path.startsWith(p));
      if (!isInPath) return;
    }
    const cache = this.app.metadataCache.getFileCache(file);
    if (cache?.frontmatter?.[this.settings.fieldName]) return;
    try {
      await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
        frontmatter[this.settings.fieldName] = (/* @__PURE__ */ new Date()).toISOString();
        const extraLines = this.settings.extraFields.split("\n").filter((line) => line.trim());
        for (const line of extraLines) {
          const parts = line.split("=");
          if (parts.length === 2) {
            const key = parts[0].trim();
            const value = parts[1].trim();
            if (key) {
              frontmatter[key] = value;
            }
          }
        }
      });
    } catch (error) {
      console.warn(`[V.ReadAt] \u65E0\u6CD5\u66F4\u65B0 ${file.path}:`, error);
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var ReadAtSettingTab = class extends import_obsidian.PluginSettingTab {
  plugin;
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "V.ReadAt \u8BBE\u7F6E" });
    new import_obsidian.Setting(containerEl).setName("\u542F\u7528\u81EA\u52A8\u5199\u5165").setDesc("\u6253\u5F00\u6587\u4EF6\u65F6\u81EA\u52A8\u5199\u5165 read_at \u65F6\u95F4\u6233").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.writeOnOpen).onChange(async (value) => {
        this.plugin.settings.writeOnOpen = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u4E3B\u65F6\u95F4\u6233\u5B57\u6BB5\u540D").setDesc("\u5199\u5165\u65F6\u95F4\u6233\u7684\u5B57\u6BB5\u540D\uFF0C\u9ED8\u8BA4 read_at").addText(
      (text) => text.setValue(this.plugin.settings.fieldName).onChange(async (value) => {
        this.plugin.settings.fieldName = value.trim() || "read_at";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u76D1\u63A7\u8DEF\u5F84").setDesc("\u7559\u7A7A\u5219\u76D1\u63A7\u6574\u4E2A Vault\u3002\u82E5\u586B\u5199\uFF0C\u6BCF\u884C\u4E00\u4E2A\u8DEF\u5F84\uFF0C\u4EC5\u5728\u8FD9\u4E9B\u8DEF\u5F84\u4E0B\u751F\u6548\u3002").addTextArea(
      (text) => text.setPlaceholder("\u7559\u7A7A\u5373\u5168\u5C40\uFF0C\u4F8B\u5982\uFF1A1.Topics\n0.Daily").setValue(this.plugin.settings.paths.join("\n")).onChange(async (value) => {
        this.plugin.settings.paths = value.split("\n").filter((p) => p.trim());
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u540C\u6B65\u66F4\u65B0\u5176\u4ED6 YAML \u5B57\u6BB5").setDesc("\u6BCF\u884C\u4E00\u4E2A key=value \u5BF9\uFF0C\u4F8B\u5982 status=read\u3002\u7559\u7A7A\u5219\u4E0D\u66F4\u65B0\u4EFB\u4F55\u989D\u5916\u5B57\u6BB5\u3002").addTextArea(
      (text) => text.setPlaceholder("\u4F8B\u5982\uFF1Astatus=read\npriority=high").setValue(this.plugin.settings.extraFields).onChange(async (value) => {
        this.plugin.settings.extraFields = value;
        await this.plugin.saveSettings();
      })
    );
  }
};
