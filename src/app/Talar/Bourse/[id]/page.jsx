'use client';
import React from 'react';
import alertify from 'alertifyjs';
import "../../../../style/app.css"
import "../../../../style/talar.css"
import { useParams } from 'next/navigation';

const Page = () => {

  const { id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // const form = e.target;

    // const title = form.title.value;
    // const content = form.content.value
    // const symbolId = form.symbolId.value;
    // const userId = '1'; // فرضاً کاربر لاگین شده
    // const imageFile = form.image.files[0];

    
    const formData = new FormData(e.target);
    // formData.append('Title', title);
    // formData.append('Content', content);
    // formData.append('UserId', userId);
    // formData.append('SymbolId', symbolId);
    if ( !formData.get("content")) {
      alertify.error('لطفاً همه فیلدها را پر کنید');
      return;
    }
    
    try {
      const response = await fetch('https://localhost:7282/api/analysis ', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alertify.success('تحلیل با موفقیت ثبت شد');
        form.reset(); // پاک کردن فرم
      } else {
        alertify.error(data.message || 'خطا در ثبت تحلیل');
      }
    } catch (error) {
      console.error(error);
      alertify.error('ارتباط با سرور برقرار نشد');
    }
  };

  return (
    <div id='container-of-talar'>
      <div id='adding-analysis'>
        <img src="/Images/Home/analysis.png" alt="Analysis" />
        <form onSubmit={handleSubmit}>
          <div className='common-input'>
            <i className="fa-solid fa-text-size"></i>
            <textarea
              type="text"
              placeholder='متن تحلیل'
              name='content'
            />
          </div>
          <div>
            <input type="hidden" name="symbolId" value={id} placeholder="SymbolId" />
            <button type="submit">ثبت تحلیل</button>
            <input type="file" name="image" accept="image/*" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
