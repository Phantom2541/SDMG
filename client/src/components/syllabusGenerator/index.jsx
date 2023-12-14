import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SyllabusGenerator({
  handleClick,
  selectedBoard,
  selectedSubject,
}) {
  const [oldSubject, setOldSubject] = useState({}),
    { collections, isLoading } = useSelector(({ subjects }) => subjects);

  useEffect(() => {
    if (selectedSubject?._id) {
      setOldSubject(selectedSubject);
    }
  }, [selectedSubject]);

  useEffect(() => {
    setOldSubject({});
  }, [isLoading]);

  const parseSyllabus = () => {
    const tableBody = new Array(13).fill().map((_, index) => {
      let indicator = "specialization",
        size = undefined;

      if (index < 6) {
        indicator = "core";
        if (index === 0) size = 6;
      } else if (index < 9) {
        indicator = "contextualized";
        if (index === 6) size = 3;
      } else {
        if (index === 9) size = 4;
      }

      return {
        indicator,
        size,
        first: {},
        second: {},
      };
    });

    for (const subject of collections) {
      const { position, semester } = subject;

      const numberTxt = { 1: "first", 2: "second" };

      tableBody[position] = {
        ...tableBody[position],
        [numberTxt[semester]]: subject,
      };
    }

    return tableBody;
  };

  return (
    <tbody>
      {parseSyllabus().map((data, index) => {
        const { first, second, indicator, size } = data;

        const subjectCol = (x, y, subject) => {
          const boardId = `${indicator}/${x}-${y}`;
          let color = undefined;

          if (selectedBoard === boardId) color = "primary";
          if (oldSubject?._id && oldSubject?._id === subject?._id)
            color = "warning";

          return (
            <td
              onClick={() => handleClick(subject, boardId)}
              className={`cursor-pointer ${color && `bg-${color} text-white`}`}
            >
              {subject?.title}
            </td>
          );
        };

        return (
          <tr key={index}>
            {size && (
              <td
                rowSpan={size}
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  fontWeight: "bold",
                  width: "20px",
                  textTransform: "uppercase",
                }}
              >
                {indicator} SUBJECTS
              </td>
            )}
            {subjectCol(1, index, first)}
            {subjectCol(2, index, second)}
          </tr>
        );
      })}
      <tr>
        <td className="font-weight-bold p-0" style={{ fontSize: "10px" }}>
          HOURS PER DAY
        </td>
        <td>7</td>
        <td>7</td>
      </tr>
    </tbody>
  );
}
