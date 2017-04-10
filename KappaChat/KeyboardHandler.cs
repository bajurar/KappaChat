using CefSharp;
using System.Windows.Forms;

namespace KappaChat
{
    internal class KeyboardHandler : IKeyboardHandler
    {

        public bool OnPreKeyEvent(IWebBrowser browserControl, IBrowser browser, KeyType type, int windowsKeyCode, int nativeKeyCode, CefEventFlags modifiers, bool isSystemKey, ref bool isKeyboardShortcut)
        {
            const int F5 = 116;
            const int F11 = 122;
            var form = (Browser)((System.Windows.Forms.Control)browserControl).TopLevelControl;
            if (type == KeyType.KeyUp) {
                switch (windowsKeyCode)
                {
                    case F5:
                        form.Invoke((MethodInvoker)(() => { form.RefreshWebPage(); }));
                        break;
                    case F11:
                        form.Invoke((MethodInvoker)(() => { form.ChangeMenuVisibility(); }));
                        break;
                    default:
                        break;
                }
            }
            return true;
        }

        public bool OnKeyEvent(IWebBrowser browserControl, IBrowser browser, KeyType type, int windowsKeyCode, int nativeKeyCode, CefEventFlags modifiers, bool isSystemKey)
        {
            return true;
        }
    }
}