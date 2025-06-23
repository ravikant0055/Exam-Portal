import React from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../../data.json';

const Topics = () => {
  const navigate = useNavigate();
  const topics = Object.keys(data.English);

  const getStoredPercentage = (topic) => {
    const val = localStorage.getItem(`score_${topic}`);
    return val ? `Score : ${val} %` : 'Not Attempted';
  };

  return (
    <div className='p-[2rem] bg-[#f8f9fe] min-h-screen'>
      <h1 className='text-3xl font-medium mb-6'>English</h1>
      <div className='space-y-4'>
        {topics.map((topic, index) => (
          <div key={index} className='flex justify-between bg-white rounded-lg shadow p-4 items-center'>
            <h1 className='text-xl font-semibold'>{topic}</h1>
            <div className='flex gap-5 items-center'>
                <h1 className={`text-lg font-medium ${getStoredPercentage(topic)=="Not Attempted" ? "text-red-600" : "text-green-700" }`}> {getStoredPercentage(topic)}</h1>
                <button
                className='px-4 cursor-pointer py-2 rounded bg-green-500 text-white font-medium'
                onClick={() => navigate(`/questions/${encodeURIComponent(topic)}`)}
                >
                Start
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
