import React, { useState, useReducer, useEffect } from "react";

import { reducer, initialToDoItemsState } from "../reducers/reducer";

const Todo = () => {
  const [toDoItemsState, dispatch] = useReducer(reducer, initialToDoItemsState);

  const [newItemText, setnewItemText] = useState("");
  let toDoElements = [{ name: "test" }];

  const handleChanges = (e) => {
    setnewItemText(e.target.value);
  };

  useEffect(() => {
    toDoElements = toDoItemsState.itemsArray;
  }, [toDoItemsState]);

  return (
    <div>
      <h1>Welcome to your TO-DO List </h1>

      <div>
        <input
          className="title-input"
          type="text"
          name="newItemText"
          value={newItemText}
          onChange={handleChanges}
        />
        <button
          onClick={() => {
            setnewItemText("");
            dispatch({
              type: "ADD_ITEM",
              payload: { name: newItemText, id: Date(), isCompleted: false },
            });
          }}
        >
          Add Item
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "CLEAR_ALL",
            });
          }}
        >
          Clear All
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "CLEAR_COMPLETED",
            });
          }}
        >
          Clear Completed
        </button>
      </div>

      <div>
        {toDoItemsState.itemsArray.map((elem) => {
          return (
            <div>
              {elem.name}{" "}
              <button
                onClick={() => {
                  console.log(elem);
                  dispatch({
                    type: "REMOVE_ITEM",
                    payload: elem,
                  });
                }}
              >
                Remove Item
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "TOGGLE_COMPLETED",
                    payload: elem,
                  });
                }}
              >
                Mark Completed
              </button>
              currently it's {JSON.stringify(elem.isCompleted)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
