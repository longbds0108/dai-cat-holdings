document.addEventListener('DOMContentLoaded', () => {
  const pairs = [
    { editor: 'editor-vi', input: 'input-descriptionVi' },
    { editor: 'editor-en', input: 'input-descriptionEn' },
    { editor: 'editor-content-vi', input: 'input-contentVi' },
    { editor: 'editor-content-en', input: 'input-contentEn' },
  ];

  const instances = [];
  pairs.forEach(({ editor, input }) => {
    const el = document.getElementById(editor);
    if (!el || typeof Quill === 'undefined') return;
    const quill = new Quill(`#${editor}`, { theme: 'snow' });
    instances.push({ quill, inputId: input });
  });

  const form = document.querySelector('form');
  if (form && instances.length) {
    form.addEventListener('submit', () => {
      instances.forEach(({ quill, inputId }) => {
        const input = document.getElementById(inputId);
        if (input) input.value = quill.root.innerHTML;
      });
    });
  }
});
