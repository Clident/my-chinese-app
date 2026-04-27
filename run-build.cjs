const { spawn } = require('child_process');
const child = spawn('pnpm', ['build'], { 
  cwd: 'C:\\Users\\quent\\Desktop\\my-chinese-app',
  shell: true,
  stdio: 'inherit'
});
child.on('close', (code) => process.exit(code));
