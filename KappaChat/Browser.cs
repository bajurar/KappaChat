using CefSharp;
using CefSharp.WinForms;
using CefSharp.WinForms.Internals;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace KappaChat
{
    public partial class Browser : Form
    {
        private readonly ChromiumWebBrowser browser;
        private bool scriptLoaded;
        public Browser()
        {
            InitializeComponent();

            browser = new ChromiumWebBrowser(Properties.Settings.Default.ChatPath)
            {
                Dock = DockStyle.Fill,
            };
            toolStripContainer1.ContentPanel.Controls.Add(browser);
            browser.KeyboardHandler = new KeyboardHandler();
            browser.LoadingStateChanged += OnLoadingStateChanged;
        }
        protected override void OnPaintBackground(PaintEventArgs e)
        {
        }
        private void OnLoadingStateChanged(object sender, LoadingStateChangedEventArgs args)
        {
            if (!args.IsLoading && !scriptLoaded)
            {
                var script = "";

                System.IO.TextReader tr = new System.IO.StreamReader(Properties.Settings.Default.ScriptPath);
                script = tr.ReadToEnd();

                browser.GetMainFrame().ExecuteJavaScriptAsync(script);

                var loadStyleScript =string.Format("var style = document.createElement('style');style.innerHTML = '{0}';document.head.appendChild(style);", new System.IO.StreamReader(Properties.Settings.Default.StylePath).ReadToEnd().Replace(Environment.NewLine, " "));

                browser.GetMainFrame().ExecuteJavaScriptAsync(loadStyleScript);
                scriptLoaded = true;
            }
        }

        private void toolStripContainer1_ContentPanel_Load(object sender, EventArgs e)
        {

        }

        private void toolStripContainer1_TopToolStripPanel_Click(object sender, EventArgs e)
        {

        }

        private void Browser_SizeChanged(object sender, EventArgs e)
        {

        }

        private void Browser_FormClosing(object sender, FormClosingEventArgs e)
        {
            SaveSettings();

        }

        private void SaveSettings()
        {
            System.Drawing.Rectangle bounds = this.WindowState != FormWindowState.Normal ? this.RestoreBounds : this.DesktopBounds;
            Properties.Settings.Default.WindowLocation = bounds.Location;
            Properties.Settings.Default.WindowSize = bounds.Size;
            Properties.Settings.Default.WindowState =
                Enum.GetName(typeof(FormWindowState), this.WindowState);
            Properties.Settings.Default.ShowMenu = menuStrip1.Visible;
            Properties.Settings.Default.Save();
        }

        private void Browser_Load(object sender, EventArgs e)
        {
            this.DesktopBounds =
                new Rectangle(Properties.Settings.Default.WindowLocation,
            Properties.Settings.Default.WindowSize);
            this.WindowState = (FormWindowState)Enum.Parse(
                typeof(FormWindowState),
                Properties.Settings.Default.WindowState);
            menuStrip1.Visible = showMenuToolStripMenuItem.Checked = Properties.Settings.Default.ShowMenu;
        }

        private void showMenuToolStripMenuItem_CheckedChanged(object sender, EventArgs e)
        {
            menuStrip1.Visible = showMenuToolStripMenuItem.Checked;
        }

        private void Browser_KeyPress(object sender, KeyPressEventArgs e)
        {

        }

        public void RefreshWebPage()
        {
            LoadChat();
        }

        private void LoadChat()
        {
            browser.Load(Properties.Settings.Default.ChatPath);
            scriptLoaded = false;
        }

        public void ChangeMenuVisibility()
        {
            showMenuToolStripMenuItem.Checked = !showMenuToolStripMenuItem.Checked;
        }

        private void opcjeToolStripMenuItem_Click(object sender, EventArgs e)
        {
            var optionsForm = new Options();
            var result = optionsForm.ShowDialog();
            if (result == DialogResult.OK)
            {
                RefreshWebPage();
            }
        }
    }
}
