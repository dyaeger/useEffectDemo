import React, { useState, useEffect, useCallback } from "react";

export const HookExample = () => {
    const [ran, updateRan] = useState(0);
    const [state, setState] = useState({
        id: 0,
        someString: "",
        someObject: {
            a: "1"
        },
        someArray: [1, 2, 3]
    });
    const [someBool, setSomeBool] = useState(false);

    const { id, someString, someObject, someArray } = state;

    const logSomeBoolIncorrectly = () => {
        console.log("Some Bool:", someBool);
    };

    const logSomeBoolCorrectly = useCallback(() => {
        console.log("Some Bool:", someBool);
    }, [someBool])

    const updateId = () => {
        setState(previousState => ({
            ...previousState,
            id: previousState.id + 1
        }));
    };

    const updateSomeString = () => {
        const newString =
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15);
        console.log("I Ran!");
        setState(previousState => ({
            ...previousState,
            someString: newString
        }));
    };

    const updateSomeObjectCorrectly = () => {
        const copy = { ...someObject };
        copy.a =
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15);

        setState(previousState => {
            return {
                ...previousState,
                someObject: {
                    ...copy
                }
            };
        });
    };

    const updateSomeObjectIncorrectly = () => {
        setState(previousState => {
            previousState.someObject.a = Math.random()
                .toString(36)
                .substring(2, 15) +
                Math.random()
                    .toString(36)
                    .substring(2, 15);
            return {
                ...previousState
            };
        });
    }

    const updateSomeArrayCorrectly = (arr) => {
        setState(previousState => {
            return {
                ...previousState,
                someArray: [...arr, 1]
            };
        });
    };

    const updateSomeArrayIncorrectly = (arr) => {
        arr.push(1);
        setState(previousState => {
            return {
                ...previousState,
                someArray: arr
            };
        });
    }

    const toggleSomeBool = () => {
        setSomeBool((previousState) => (!previousState));
    }

    useEffect(() => {
        updateRan(previousValue => previousValue + 1);

        logSomeBoolCorrectly();
    }, [id, someString, someObject, someArray, logSomeBoolCorrectly]);

    return (
        <div>
            <div>Number of updates: {ran}</div>

            <br />
            <br />

            <div className="button-container">
                <button className="okay" type="button" onClick={updateId}>
                    Update ID
        </button>
                <button className="okay" type="button" onClick={updateSomeString}>
                    Update Some String
        </button>
                <button className="okay" type="button" onClick={updateSomeObjectCorrectly}>
                    Update Some Object Correctly
        </button>
                <button className="notokay" type="button" onClick={updateSomeObjectIncorrectly}>
                    Update Some Object Incorrectly
        </button>
                <button className="okay" type="button" onClick={() => updateSomeArrayCorrectly(someArray)}>
                    Update Some Array Correctly
        </button>
                <button className="notokay" type="button" onClick={() => updateSomeArrayIncorrectly(someArray)}>
                    Update Some Array Incorrectly
        </button>
                <button className="okay" type="button" onClick={toggleSomeBool}>Toggle Some Bool</button>
            </div>

            <br />
            <br />

            <div>
                My state object:
        <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>

            <div>
                Some Bool: {someBool ? 'True' : 'False'}
            </div>
        </div>
    );
};
