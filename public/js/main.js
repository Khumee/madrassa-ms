function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? '#2ecc71' : '#e74c3c';
    
    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 12px 25px;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-family: inherit;
        font-weight: bold;
        min-width: 200px;
        text-align: center;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        pointer-events: auto;
    `;
    
    toast.textContent = message;
    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showConfirm(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;

    const modal = document.createElement('div');
    modal.className = 'card';
    modal.style.cssText = `
        width: 300px;
        text-align: center;
        padding: 25px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;

    modal.innerHTML = `
        <h3 style="margin-bottom: 15px;">تأكيد</h3>
        <p style="margin-bottom: 20px;">${message}</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button id="confirm-yes" class="btn btn-danger">نعم، حذف</button>
            <button id="confirm-no" class="btn btn-secondary">إلغاء</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('confirm-yes').onclick = () => {
        onConfirm();
        overlay.remove();
    };
    document.getElementById('confirm-no').onclick = () => {
        overlay.remove();
    };
}
