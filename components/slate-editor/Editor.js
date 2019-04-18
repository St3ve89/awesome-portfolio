import React from 'react'
// Import the Slate editor.
import { Editor } from 'slate-react';
import { Value } from 'slate';


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
    this.setState({isLoaded: true});
  }
  
  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next()

    // Decide what to do based on the key code...
    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault()
        editor.toggleMark('bold')
        break
      }
      // When "`" is pressed, keep our existing code block logic.
      case '`': {
        const isCode = editor.value.blocks.some(block => block.type == 'code')
        event.preventDefault()
        editor.setBlocks(isCode ? 'paragraph' : 'code')
        break
      }
      // Otherwise, let other plugins handle it.
      default: {
        return next()
      }
    }
  }

  // Add a `renderNode` method to render a `CodeNode` for code blocks.
  renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      case 'paragraph':
        return <p {...props.attributes}>{props.children}</p>
      default:
        return next()
    }
  }

  // Add a `renderMark` method to render marks.
  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      default:
        return next()
    }
  }

  render() {
    const { isLoaded, value } = this.state;
    return (
      <React.Fragment>
        { isLoaded && <Editor value={value} 
                              onChange={this.onChange} 
                              onKeyDown={this.onKeyDown}
                              renderNode={this.renderNode}
                              renderMark={this.renderMark}
                              /> }
      </React.Fragment>
    )
  }
}