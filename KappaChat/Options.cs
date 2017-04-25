using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace KappaChat
{
    public partial class Options : Form
    {
        public Options()
        {
            InitializeComponent();
        }

        private void Options_Load(object sender, EventArgs e)
        {            
            textBox1.Text = Properties.Settings.Default.ChatPath;
            var jsPath = "";

            if (!string.IsNullOrWhiteSpace(Properties.Settings.Default.ScriptPath))
            {
                jsPath = System.IO.Path.GetFullPath(Properties.Settings.Default.ScriptPath);
            }
            textBox2.Text = jsPath.ToString();
            string cssPath = "";
            if (!string.IsNullOrWhiteSpace(Properties.Settings.Default.StylePath))
            {
                cssPath = System.IO.Path.GetFullPath(Properties.Settings.Default.StylePath);
            }
            textBox3.Text = cssPath.ToString();
        }

        private void Save_Click(object sender, EventArgs e)
        {
            Properties.Settings.Default.ChatPath = textBox1.Text;
            Properties.Settings.Default.ScriptPath = textBox2.Text;
            Properties.Settings.Default.StylePath = textBox3.Text;
            Properties.Settings.Default.Save();
            this.DialogResult = DialogResult.OK;
            this.Close();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            OpenFileDialog dialog = new OpenFileDialog();
            var jsPath = "";
            if (!string.IsNullOrWhiteSpace(textBox2.Text))
            {
                jsPath = System.IO.Path.GetFullPath(textBox2.Text);

                var directoryPath = new FileInfo(jsPath).Directory.FullName;
                if (Directory.Exists(directoryPath))
                {
                    dialog.InitialDirectory = directoryPath;
                }
            }
            var dialogResult = dialog.ShowDialog();
            if(dialogResult == DialogResult.OK)
            {
                textBox2.Text = dialog.FileName;
            }
            
        }

        private void button2_Click(object sender, EventArgs e)
        {
            OpenFileDialog dialog = new OpenFileDialog();
            var cssPath = "";
            if (!string.IsNullOrWhiteSpace(textBox3.Text))
            {
                cssPath = System.IO.Path.GetFullPath(textBox3.Text);
                var directoryPath = new FileInfo(cssPath).Directory.FullName;
                if (Directory.Exists(directoryPath))
                {
                    dialog.InitialDirectory = directoryPath;
                }
            }
            var dialogResult = dialog.ShowDialog();
            if (dialogResult == DialogResult.OK)
            {
                textBox3.Text = dialog.FileName;
            }

        }
    }
}
