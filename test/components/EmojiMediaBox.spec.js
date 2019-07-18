import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import EmojiMediaBox from '../../app/components/EmojiMediaBox';

Enzyme.configure({ adapter: new Adapter() });

describe('EmojiMediaBox component', () => {
  it('adds the emojiClass prop to the emoji div', () => {
    const component = shallow(<EmojiMediaBox emojiClass="emoji--baby" />);

    expect(component.find('.emoji').hasClass('emoji--baby')).toBe(true);
  });

  it('passes className to the rendered component', () => {
    const component = shallow(<EmojiMediaBox className="awesome-class" />);

    expect(component.hasClass('awesome-class')).toBe(true);
  });

  it('populates the title from props', () => {
    const component = shallow(<EmojiMediaBox title="I am a Title" />);

    expect(
      component
        .find('.media-box__content')
        .find('b')
        .text()
    ).toContain('I am a Title');
  });

  it('populates the content from props', () => {
    const component = shallow(<EmojiMediaBox content="Some content" />);

    expect(component.find('.media-box__content').text()).toContain(
      'Some content'
    );
  });

  it('should match exact snapshot', () => {
    const component = shallow(
      <EmojiMediaBox
        title="I am a Title"
        className="awesome-class"
        emojiClass="emoji--baby"
        content="Some content"
      />
    );
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
