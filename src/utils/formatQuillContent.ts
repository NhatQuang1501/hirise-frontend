export const formatQuillContent = (htmlContent: string): string => {
  if (!htmlContent) return "";

  // Đảm bảo nội dung HTML được hiển thị đúng
  // Thêm các style cần thiết để hiển thị đúng định dạng từ Quill
  const styledContent = `
    <style>
      .ql-editor {
        font-size: 1rem;
        line-height: 1.6;
        text-align: justify;
      }
      .ql-editor p {
        margin-bottom: 1em;
        text-align: justify;
      }
      .ql-editor ol, .ql-editor ul {
        padding-left: 1.5em;
        margin-bottom: 1em;
        text-align: justify;
      }
      .ql-editor li {
        margin-bottom: 0.5em;
      }
      .ql-editor ul > li {
        list-style-type: disc;
      }
      .ql-editor ol > li {
        list-style-type: decimal;
      }
      .ql-editor ul > li::before, .ql-editor ol > li::before {
        display: none;
      }
      .ql-ui {
        display: none;
      }
    </style>
    <div class="ql-editor">${htmlContent}</div>
  `;

  return styledContent;
};
