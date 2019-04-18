import React from 'react';
// Import the Slate editor.
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { renderMark } from './renderers';
import HoverMenu from './HoverMenu';


const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})

// Define a React component renderer for our code blocks.
function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

// Define a React component to render bold text with.
function BoldMark(props) {
  return <strong>{props.children}</strong>
}

export default class SlateEditor extends React.Component {
  state = {
    value: initialValue,
    isLoaded: false
  }

  componentDidMount() {
    this.updateMenu();
    this.setState({isLoaded: true});
  }

  componentDidUpdate() {
    this.updateMenu();
  }

  onChange = ({ value }) => {
    this.setState({ value });
  }

  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  render() {
    const { isLoaded, value } = this.state;
    return (
      <React.Fragment>
        { isLoaded && <Editor value={value} 
                              onChange={this.onChange}
                              renderMark={renderMark}
                              renderEditor={this.renderEditor}
                              /> }
      </React.Fragment>
    )
  }

  renderEditor = (props, editor, next) => {
    const children = next()
    return (
      <React.Fragment>
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </React.Fragment>
    )
  }
}