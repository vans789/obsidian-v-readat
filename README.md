# V.ReadAt

A simple Obsidian plugin that automatically writes a `read_at` timestamp to the YAML frontmatter when you open a note, with optional support for syncing additional custom fields.

> 💡 **Best paired with `V.Prefix`**: `V.ReadAt` writes the data, `V.Prefix` displays `[Read]` / `[Unread]` in the file list.

## ✨ Features

- Automatically writes a timestamp to a configurable field (default: `read_at`) when a note is opened.
- Supports syncing multiple custom YAML fields (e.g., `status=read`, `priority=high`).
- Supports restricting to specific paths (default: entire vault).
- **No hardcoded defaults**: no extra fields are written unless you configure them. (`ai_label_status` and `icon` are never touched.)

## 📦 Installation

### Option 1: Install via BRAT (recommended)
1. Install and enable the **BRAT** plugin in Obsidian.
2. Open BRAT settings and click **Add Beta plugin**.
3. Enter the repo address: `vvan/obsidian-v-readat` (replace with your actual GitHub username).
4. Click **Add** — BRAT will download and enable it automatically.

### Option 2: Manual installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the GitHub Releases page.
2. Place these files into `.obsidian/plugins/v-readat/` in your vault.
3. Restart Obsidian and enable **V.ReadAt**.

## ⚙️ Configuration

You can adjust the following in the settings tab:

- **Auto-write on open**: Whether to automatically write the timestamp when a note is opened.
- **Timestamp field name**: The field that stores the timestamp (default: `read_at`).
- **Watch paths**: One directory per line. Leave empty to watch the entire vault.
- **Sync extra YAML fields**: One `key=value` pair per line. **Leave empty to write no extra fields.**
  - Example: `status=read`, `priority=high`, `category=work`

## 📝 Usage Examples

### Default config (only write `read_at`)
After enabling the plugin, opening a note within the watch paths will automatically add:

```yaml
---
read_at: 2026-08-21T10:30:00.000Z
---
```

### With extra fields (`status`, `priority`)
In the settings, enter:

```
status=read
priority=high
```

After opening a note, its frontmatter will become:

```yaml
---
read_at: 2026-08-21T10:30:00.000Z
status: read
priority: high
---
```

## 🧑‍💻 Author

- Author: vvan
- Email: vcom@live.com

---
---

# V.ReadAt

一款 Obsidian 插件，当你在 Vault 中打开指定路径下的笔记时，自动向 YAML Frontmatter 中写入 `read_at` 时间戳，并支持同步写入用户自定义的额外字段。

> 💡 **配合 `V.Prefix` 插件使用更佳**：`V.ReadAt` 负责写入数据，`V.Prefix` 负责在列表中将已读笔记标记为 `[Read]`。

## ✨ 功能亮点

- 打开文件时自动写入时间戳（字段名可自定义，默认 `read_at`）。
- 支持同步更新多个自定义 YAML 字段（如 `status=read`、`priority=high`）。
- 支持限定监控路径（默认监控整个 Vault）。
- **无硬编码默认值**：默认不写入任何额外字段（如 `ai_label_status` 或 `icon`），完全由用户配置决定。

## 📦 安装方式

### 方式一：通过 BRAT 安装（推荐）
1. 在 Obsidian 中安装并启用 **BRAT** 插件。
2. 打开 BRAT 设置，点击 **Add Beta plugin**。
3. 输入仓库地址：`vvan/obsidian-v-readat`（请替换为你的实际 GitHub 用户名）。
4. 点击 **Add**，BRAT 会自动下载并启用。

### 方式二：手动安装
1. 从 GitHub Releases 下载 `main.js`、`manifest.json` 和 `styles.css`。
2. 将这三个文件放入 Vault 的 `.obsidian/plugins/v-readat/` 目录下。
3. 重启 Obsidian，在设置中启用 **V.ReadAt**。

## ⚙️ 配置说明

在设置面板中可以调整以下选项：

- **启用自动写入**：控制打开文件时是否自动写入时间戳。
- **主时间戳字段名**：写入时间的字段名，默认为 `read_at`。
- **监控路径**：每行一个目录，留空则监控整个 Vault。
- **同步更新其他 YAML 字段**：每行一个 `key=value` 对。**留空则不写入任何额外字段**。
  - 例如：`status=read`、`priority=high`、`category=work`

## 📝 使用示例

### 默认配置（仅写 read_at）
开启插件后，打开任意符合监控路径的笔记，其 Frontmatter 会自动添加：
```yaml
---
read_at: 2026-08-21T10:30:00.000Z
---
```

### 配置额外字段（status、priority）
在设置面板的“同步更新其他 YAML 字段”中输入：
```
status=read
priority=high
```
打开笔记后，Frontmatter 会自动变为：
```yaml
---
read_at: 2026-08-21T10:30:00.000Z
status: read
priority: high
---
```

## 🧑‍💻 作者

- 作者：vvan
- 邮箱：vcom@live.com
