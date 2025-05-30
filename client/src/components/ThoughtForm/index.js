import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
import Button from '../ui/Button';

const ThoughtForm = () => {

  // update thoughts cache on adding new thoughts
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] }
        });
      } catch (e) {
        console.error(e);
      }
  
      // update me object's cache, appending new thought to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
      });
    }
  });

  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  
  // HandleChange on textarea onChange:
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // HandleFormSubmit onSubmit form:
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await addThought({ variables: { thoughtText } });
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Here's a new thought..."
          value={thoughtText}
          className="form-input w-full min-h-[80px] max-w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 text-gray-900 resize-none mb-2"
          onChange={handleChange}
        ></textarea>
        <Button type="submit" variant="primary" className="">Submit</Button>
        <div className={`mt-2 text-xs text-right ${characterCount === 280 || error ? 'text-red-500' : 'text-gray-400'}`}>
          Character Count: {characterCount}/280
          {error && <span className="ml-2">Something went wrong...</span>}
        </div>
      </form>
    </div>
  );
};

export default ThoughtForm;