function showToast(message, type = "success") {

    if (!message) return;

    let background = "";

    switch (type) {

        case "success":
            background = "linear-gradient(135deg,#10b981,#22c55e)";
            break;

        case "error":
            background = "linear-gradient(135deg,#ef4444,#dc2626)";
            break;

        case "warning":
            background = "linear-gradient(135deg,#f59e0b,#d97706)";
            break;

        case "info":
            background = "linear-gradient(135deg,#3b82f6,#2563eb)";
            break;

        default:
            background = "linear-gradient(135deg,#6366f1,#7c3aed)";
    }

    Toastify({
        text: message,
        duration: 4000,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,
        newestOnTop: true,
        offset: {
            x: 20,
            y: 20
        },
        style: {
            background,
            borderRadius: "14px",
            padding: "14px 20px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#fff",
            boxShadow: "0 15px 35px rgba(0,0,0,.25)",
            border: "1px solid rgba(255,255,255,.15)"
        }
    }).showToast();
}

document.addEventListener("DOMContentLoaded", () => {

    // Flash Messages
    if (window.successMessage) {
        showToast(window.successMessage, "success");
    }

    if (window.errorMessage) {
        showToast(window.errorMessage, "error");
    }

    if (window.warningMessage) {
        showToast(window.warningMessage, "warning");
    }

    if (window.infoMessage) {
        showToast(window.infoMessage, "info");
    }

});