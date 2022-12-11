import React, { useState, useEffect } from 'react';
import axios from "axios";
import Statement from './Statement';
import Testcase from './Testcase';
import './Left.css';

import { useParams } from "react-router-dom";
import MyEditor from './MyEditor';

import SplitPane, { Pane } from 'react-split-pane';





function Left() {
    const [state, setState] = useState(
        {
            problemInfo: {},
            testCases: [],
        }
    );

    const [loading, setLoading] = useState(false);

    let { no } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const problemInfo = await axios(
                `http://146.56.165.145:8000/api/problem/${no}`
            );
            const testCases = await axios(
                `http://146.56.165.145:8000/api/testcase/${no}`
            )
            setState({
                problemInfo: problemInfo.data,
                testCases: testCases.data,
            });
            setLoading(false);

        };
        fetchData();
    }, []);

    return (
        <SplitPane split="vertical" minSize={300} defaultSize={700} style={{ position: 'relative', overflow: 'hidden' }} >
            <Pane style={{ height: '500vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                <Statement description={state.problemInfo.description} restrictions={state.problemInfo.restrictions} />
                <Testcase testCases={state.testCases} />
            </Pane>

            <Pane>
                <MyEditor no={no} />
            </Pane>


        </SplitPane>
    );
}

export default Left;