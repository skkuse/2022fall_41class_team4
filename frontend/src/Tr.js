import React from "react";
import Td from "./Td";
import { Link } from "react-router-dom";

class Tr extends React.Component {
    render() {
        return (
            <tbody>
                {
                    this.props.ProblemData.map((elem) => {
                        return (
                            <Td item={elem} />
                        );
                    })
                }
            </tbody >
        );
    };
};

export default Tr;