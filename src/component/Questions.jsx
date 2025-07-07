import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import data from '../../data.json';

const Questions = () => {
  const navigate = useNavigate();
  const { testName } = useParams();
  const decodedName = decodeURIComponent(testName);
  const questions = data.English[decodedName];

  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[current];

  const handleOptionChange = (qid, index) => {
    setSelectedAnswers({ ...selectedAnswers, [qid]: index + 1 });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = questions.reduce((acc, q) => (selectedAnswers[q.id] === q.answer ? acc + 1 : acc), 0);
    const percent = ((correct / questions.length) * 100).toFixed(2);
    localStorage.setItem(`score_${decodedName}`, percent);
  };

  const correctCount = questions.reduce((acc, q) => (selectedAnswers[q.id] === q.answer ? acc + 1 : acc), 0);

  return (
    <div className='p-[2rem] bg-[#f8f9fe] min-h-screen'>
      <button className='mb-5 cursor-pointer' onClick={()=>navigate("/")}>All Topics</button>
      <h1 className='text-3xl font-medium mb-6'>{decodedName}</h1>
      <div className='flex gap-4'>
        <div className='w-full md:w-[80%] flex md:flex-row flex-col gap-5 md:gap-0 bg-white shadow-lg rounded-xl p-[2rem]'>
          <div className='w-full md:w-[70%]'>
            <h2 className='text-xl font-medium mb-4'>
              Q{currentQuestion.id}.{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: currentQuestion.question.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            </h2>

            <div className='flex flex-col gap-2 mb-6'>
              {currentQuestion.options.map((opt, index) => (
                <label key={index} className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name={`question-${currentQuestion.id}`}
                    checked={selectedAnswers[currentQuestion.id] === index + 1}
                    onChange={() => handleOptionChange(currentQuestion.id, index)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            {submitted && (
              <div className='mb-4'>
                <p className={selectedAnswers[currentQuestion.id] === currentQuestion.answer ? 'text-green-600' : 'text-red-600'}>
                  {selectedAnswers[currentQuestion.id] === currentQuestion.answer
                    ? 'Correct!'
                    : `Incorrect. Correct answer is: ${currentQuestion.solution}`}
                </p>
              </div>
            )}

            <div className='flex gap-3 mt-4'>
              <button
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                className='px-5 cursor-pointer py-2 rounded font-medium bg-[#f11f3d] text-white disabled:opacity-50'
              >
                Previous
              </button>
              {current < questions.length - 1 && (
                <button
                  onClick={() => setCurrent(current + 1)}
                  className='px-9 cursor-pointer py-2 rounded font-medium bg-[#296ff6] text-white'
                >
                  Next
                </button>
              )}
              {current === questions.length - 1 && (
                <button
                  onClick={handleSubmit}
                  className='px-3 py-2 rounded-lg font-medium bg-green-500 text-white'
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          {submitted && (
            <div className='w-full md:w-[30%] mt-4 text-green-600 text-lg font-medium'>
              <h1>Score: {correctCount} / {questions.length}</h1>
              <h1 className='text-red-600'>Incorrect: {questions.length - correctCount}</h1>
              <h1 className='text-yellow-700'>Percentage: {((correctCount / questions.length) * 100).toFixed(2)}%</h1>
            </div>
          )}
        </div>

        <div className='hidden md:block w-[20%] bg-white shadow-lg rounded-xl p-[1rem]'>
          <h3 className='font-semibold text-lg mb-3'>Progress</h3>
          <div className='flex flex-wrap gap-5 text-sm ml-4'>
            {questions.map((q) => (
              <h1 key={q.id} className={`list-none py-2 w-[40px] text-white font-medium text-center rounded ${selectedAnswers[q.id] ? 'bg-[#4ecc63]' : 'bg-[#296ff6]'}`}>
                Q{q.id}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
