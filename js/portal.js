const $ = (selector) => document.querySelector(selector);
const redirUrl = new URLSearchParams(window.location.search).get("redirurl");

async function api(endpoint, data = {}) {
    const res = await fetch(`/api/captiveportal/access/${endpoint}/`, {
        method: "POST",
        body: new URLSearchParams(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

const voucher = document.querySelector('#voucher');
const alertBox = document.querySelector('#alert-msg');
const errorText = document.querySelector('#error-msg-text');
const loginForm = document.querySelector('#login-form');

function showError(msg) {
    errorText.textContent = msg;
    alertBox.classList.remove("d-none");
}

const hideError = () => alertBox.classList.add("d-none");

$("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    hideError();

    const user = voucher.value.slice(0, 4), password = voucher.value.slice(4);

    try {
        const data = await api("logon",  { user: user, password: password });

        if (data.clientState === "AUTHORIZED") {
            if (redirUrl !== null) {
                window.location.href = `http://${redirUrl}?refresh`;
            } else {
                window.location.reload();
            }
        } else {
            voucher.value = "";
            showError("Authentication failed")
        }
    } catch {
        showError("Unable to connect to authentication server")
    }
});

(async () => {
    try {
        const data = await api('status');

        if (data.clientState === 'AUTHORIZED') {
            $('#logout_frm')?.classList.remove('d-none');
        } else if (data.authType === 'none') {
            $('#login_none')?.classList.remove('d-none');
        } else {
            $('#login_password')?.classList.remove('d-none');
        }
    } catch {
        showError('unable to connect to authentication server');
    }
})();