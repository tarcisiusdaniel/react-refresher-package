import { useState } from 'react';

import TabButton from "../TabButton/TabButton";
import Section from '../Section/Section';
import { EXAMPLES } from "../../data";
import Tabs from '../Tabs/Tabs';

export default function Examples() {
    const [content, setContent] = useState();

    function handleSelect(selectedVal) {
        setContent(selectedVal);
        console.log(content);
    }

    let tabContent = <p>Select a topic.</p>;

    if (content) {
        tabContent = <div id = "tab-content">
        <h3>{EXAMPLES[content].title}</h3>
        <p>{EXAMPLES[content].description}</p>
        <pre>
          <code> {EXAMPLES[content].code} </code>
        </pre>
      </div>
    }

    return (
        <Section title = "Examples" id = "examples">
            <Tabs 
                children = {tabContent}
                buttons = {
                    <>
                        {/* children prop: whatever comes in between the HTML tag */}
                        {/* In this, Components is the children prop sent to TabButton component */}
                        {/* Condiditional rendering can be done with ? : or && */}
                        <TabButton 
                        className = {(content === "components") ? 'active' : ''} 
                        onSelect = {() => handleSelect('components')}>
                            Components
                        </TabButton>
                        <TabButton 
                        className = {(content === "jsx") ? 'active' : ''} 
                        onSelect = {() => handleSelect('jsx')}>
                            JSX
                        </TabButton>
                        <TabButton 
                        className = {(content === "props") ? 'active' : ''} 
                        onSelect = {() => handleSelect('props')}>
                            Props
                        </TabButton>
                        <TabButton 
                        className = {(content === "state") ? 'active' : ''} 
                        onSelect = {() => handleSelect('state')}>
                        State
                        </TabButton>
                    </>
                }
            />
        </Section>
    );
}