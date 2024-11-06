from flask import Flask, render_template, request
from flask_socketio import SocketIO, send

# إنشاء تطبيق Flask
app = Flask(__name__)
socketio = SocketIO(app)

# تخزين المعلومات المتعلقة بالعملاء
clients = {}  # تخزين أسماء المستخدمين مع معرّف العميل

# الصفحة الرئيسية حيث يدخل العميل اسم المستخدم
@app.route('/')
def index():
    return render_template('index.html')

# استقبال الرسائل من العملاء
@socketio.on('message')
def handle_message(message):
    # إرسال الرسالة إلى جميع العملاء
    send(message, broadcast=True)

# استقبال اسم المستخدم عند دخول العميل
@socketio.on('set_username')
def handle_username(username):
    # تخزين اسم المستخدم بناءً على معرّف العميل
    clients[request.sid] = username
    print(f"New user connected: {username}")

# تشغيل الخادم وتحديد المنفذ
if __name__ == "__main__":
    socketio.run(app, debug=True, port=5555) 


