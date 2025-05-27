import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';
import Button from '../ui/Button';

const ReactionForm = ({ thoughtId }) => {
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            // add thought to database
            await addReaction({
              variables: { reactionBody, thoughtId }
            });
      
            // clear form value
            setBody('');
            setCharacterCount(0);
          } catch (e) {
            console.error(e);
          }


    };

    const [addReaction, { error }] = useMutation(ADD_REACTION);

    return (
        <div>
            <form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    className="form-input w-full min-h-[60px] max-w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 text-gray-900 resize-none mb-2"
                    value={reactionBody}
                    onChange={handleChange}
                ></textarea>
                <Button type="submit" variant="primary" className="self-end">Submit</Button>
                <div className={`mt-2 text-xs text-right ${characterCount === 280 || error ? 'text-red-500' : 'text-gray-400'}`}>
                    Character Count: {characterCount}/280
                    {error && <span className="ml-2">Something went wrong...</span>}
                </div>
            </form>
        </div>
    );
};

export default ReactionForm;