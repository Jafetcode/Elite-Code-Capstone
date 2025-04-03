import React from 'react';

function Assigning() {
    const assignTo = route.params?.assignTo;
    const question = route.params?.q;
    return (
        <View>
            <Text> Assigning to {assignTo} the question: {question.question}</Text>
        </View>
    );
}

export default Assigning;