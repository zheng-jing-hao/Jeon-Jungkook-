# 待辦清單 Web App

![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

這是在 GitHub Copilot 實戰工作坊完成的待辦清單 Web App。使用者可以管理每日事項、追蹤完成狀態，並依需求調整顯示主題與清單篩選方式。

## 線上展示

[GitHub Pages](https://<你的帳號>.github.io/<你的repo名稱>/)

## 功能

- 新增待辦事項，空白內容不會加入清單。
- 勾選或取消勾選待辦；已完成項目會以刪除線和淡化樣式呈現。
- 個別刪除待辦事項。
- 依「全部」、「未完成」或「已完成」篩選清單。
- 顯示整份清單的未完成數量，不受目前篩選條件影響。
- 清單或篩選結果為空時，顯示相應提示。
- 切換淺色與深色模式；首次使用時跟隨作業系統設定，手動選擇會保存。
- 待辦事項保存於 `localStorage`，重新整理後仍會保留。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用前端框架或第三方套件；不需建置工具或外部 CDN。
- 使用 CSS 自訂變數管理淺色與深色主題配色。
- 以瀏覽器 `localStorage` 保存待辦資料與手動選擇的主題偏好。

## 開發方式

- 在 GitHub Copilot 實戰工作坊中使用 Copilot Agent Mode，依需求逐步建立並修改多個前端檔案，再透過瀏覽器檢查行為。
- `.vscode/mcp.json` 設定 Microsoft Learn 與 GitHub MCP Server，供工作流程連接官方文件與 GitHub 資源。
- `.github/prompts/fix-issue.prompt.md` 定義 issue 修復流程，包含先提出計畫並等待確認、建立分支、修改與驗證、提交推送及建立 Pull Request。
- 透過 Git 分支與提交保留變更歷程，並練習還原操作。

## 我學到什麼

- 將功能需求拆成可執行的修改與驗證步驟。
- 使用原生 DOM API 和事件處理建立互動功能。
- 以 `localStorage` 保存瀏覽器端資料與使用者偏好。
- 透過 CSS 變數和 `prefers-color-scheme` 支援主題切換。
- 使用 Git 分支、提交與還原管理變更，並理解 MCP 與 prompt 如何支援工作流程。