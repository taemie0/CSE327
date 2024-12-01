const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Configure Enzyme with the React 16 adapter
configure({ adapter: new Adapter() });
