import React from "react";

class Td extends React.Component {

    render() {
        return (
            <>
                <tr className="bg-white border-2 border-gray-200">
                    <td className="px-4 py-3">{this.props.item.id}</td>
                    <td className="px-4 py-3">{this.props.item.name}</td>
                    <td className="px-4 py-3">{this.props.item.email}</td>
                    <td className="px-4 py-3">{this.props.item.phone}</td>
                    <td className="px-4 py-3">{this.props.item.website}</td>
                </tr>
            </>
        );
    };
};

export default Td;