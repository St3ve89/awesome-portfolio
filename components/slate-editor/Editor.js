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

  render() {
    const { isLoaded, value } = this.state;
    return (
      <React.Fragment>
        { isLoaded && <Editor value={value} onChange={this.onChange} /> }
      </React.Fragment>
    )
  }
}