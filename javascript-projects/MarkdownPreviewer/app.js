const editorContent = document.getElementById('editor');
const previewContent = document.getElementById('preview');
const htmlContent = document.getElementById('html');
const displayTypes = document.getElementById('display-types');
let currentdisplay;

const updatePreview = async () => {
    let editorText = await editorContent.value;
    let previewText = await marked.parse(editorText);

    currentdisplay.innerHTML = previewText;
}

const updateDisplay = (e) => {
    // Get the display type that was selected.
    const display = document.getElementById(e);

    // remove show class from all displays.
    let panes = document.querySelectorAll('.pane');
    panes.forEach(p => p.classList.remove('show'));

    // Update and show the current display.
    display.classList.add('show');
    currentdisplay = display;
    updatePreview();
}


editorContent.addEventListener('input', updatePreview);

displayTypes.addEventListener('change', e => {
    updateDisplay(e.target.value)
});

updatePreview();
updateDisplay("preview");
