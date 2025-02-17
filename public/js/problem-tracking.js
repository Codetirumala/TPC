document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.problem-checkbox');
    const progressCount = document.querySelector('.progress-count');
    
    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem('stringBasicsProgress') || '{}');
    let solvedCount = 0;
    
    checkboxes.forEach((checkbox, index) => {
        if (savedProgress[index]) {
            checkbox.checked = true;
            solvedCount++;
        }
        
        checkbox.addEventListener('change', () => {
            savedProgress[index] = checkbox.checked;
            localStorage.setItem('stringBasicsProgress', JSON.stringify(savedProgress));
            
            solvedCount = checkbox.checked ? solvedCount + 1 : solvedCount - 1;
            updateProgress();
        });
    });
    
    const updateProgress = () => {
        progressCount.innerHTML = `<i class="fas fa-code"></i> ${solvedCount}/32 solved`;
    };
    
    updateProgress();
}); 