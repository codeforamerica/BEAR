import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Home from '../../app/components/Home';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.sandbox.create();

function setup() {
  process.env.HOME = '/test/home/path';
  process.env.IS_PACKAGED = 'false';
  const runScriptStub = sandbox.stub(Home.prototype, 'runScript').returns(true);
  const component = shallow(<Home />);
  return {
    buttons: component.find('button'),
    runScriptStub
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('Home component', () => {
  it('run button should call script', () => {
    const { buttons, runScriptStub } = setup();
    const runButton = buttons.at(0);
    runButton.simulate('click');
    expect(runScriptStub.called).toBe(true);
    runScriptStub.resetBehavior();
  });

  it('should match exact snapshot', () => {
    const { actions } = setup();
    const counter = (
      <div>
        <Router>
          <Home counter={1} {...actions} />
        </Router>
      </div>
    );
    const tree = renderer.create(counter).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
