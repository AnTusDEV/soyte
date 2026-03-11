import React, { useState } from "react";

export default function SurveyInfo({ info }) {
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <input
            type={field.type}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            onChange={(e) => handleChange(field.value, e.target.value)}
          />
        );

      case "date":
        return (
          <input
            type="date"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            onChange={(e) => handleChange(field.value, e.target.value)}
          />
        );

      case "select":
        return (
          <select
            className="border border-gray-300 rounded px-3 py-2 w-full"
            onChange={(e) => handleChange(field.value, e.target.value)}
          >
            <option value="">Chọn</option>

            {field.option.map((op) => (
              <option key={op.key} value={op.key}>
                {op.value}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div key={info.value}>
      <label className="block mb-1 font-medium">{info.title}</label>
      {renderField(info)}
    </div>
  );
}
