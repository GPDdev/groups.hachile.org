const toast = document.querySelector('#toast');
let toastTimer;

document.addEventListener('click', async (event) => {
  const button = event.target.closest('.copy-button');
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    toast.textContent = '已复制到剪贴板';
  } catch {
    toast.textContent = `复制失败，请手动选择：${button.dataset.copy}`;
  }
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
});

const search = document.querySelector('#group-search');
if (search) {
  const groups = [...document.querySelectorAll('.group')];
  const categories = [...document.querySelectorAll('.category')];
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const group of groups) {
      const matches = group.textContent.toLocaleLowerCase().includes(query);
      group.hidden = !matches;
      if (matches) visible++;
    }
    for (const category of categories) {
      category.hidden = !category.querySelector('.group:not([hidden])');
    }
    document.querySelector('#search-count').textContent = `找到 ${visible} 个群`;
  });
}
