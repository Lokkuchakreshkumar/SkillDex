import React from 'react'
import Each from './Each'
const Card = () => {
  return (
    <div className='mt-8 sm:w-[50%] w-full  sm:flex flex  gap-x-4 flex-wrap justify-center'>
      <Each Title={"Ask AI"} p={"Get instant clarification that understands the context."} icon={"star"}  />
        <Each Title={"Learning Path"} p={"Navigate through modules in a logical, clear sequence."} icon={"compass"} />
          <Each Title={"Interactive Quizzes"} p={"AI-generated quizzes to solidify your knowledge."} icon={"tick"} />
            <Each Title={"Auto-Docs"} p={"Comprehensive, structured curriculum for any topic."} icon={"book"} />
    </div>
  )
}

export default Card