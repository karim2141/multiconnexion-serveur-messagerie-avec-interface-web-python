const socket = io();  // الاتصال بالخادم باستخدام SocketIO

let username = "";

// دالة لتعيين اسم المستخدم عند الدخول
function setUsername() {
    username = document.getElementById("username").value;
    if (username.trim() !== "") {
        socket.emit('set_username', username);  // إرسال اسم المستخدم إلى الخادم
        document.getElementById("user-setup").style.display = 'none';  // إخفاء واجهة الدخول
        document.getElementById("join-chat-btn").style.display = 'none';  // إخفاء زر "Join Chat"
        document.getElementById("chat-box").style.display = 'block';  // إظهار واجهة الدردشة
    }
}

// دالة لإرسال الرسائل
function sendMessage(event) {
    if (event && event.key !== "Enter") return;  // إرسال الرسالة عند الضغط على "Enter"
    const message = document.getElementById("input-message").value;
    if (message.trim() !== "") {
        socket.emit('message', `${username}: ${message}`);  // إرسال الرسالة إلى الخادم
        document.getElementById("input-message").value = "";  // مسح حقل الرسالة بعد الإرسال
    }
}

// استقبال الرسائل من الخادم وعرضها في واجهة المستخدم
socket.on('message', function(message) {
    const messagesDiv = document.getElementById("messages");
    const newMessage = document.createElement("p");
    newMessage.textContent = message;  // عرض الرسالة الواردة
    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;  // التمرير إلى أسفل الرسائل
});
