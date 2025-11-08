
import React, { useState } from 'react';
import { logEvent } from '../services/chichiLog';
import { useTranslation } from '../contexts/LocalizationContext';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pax: '',
    dates: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loggedData = { 
        ...formData, 
        message: `${formData.message.substring(0, 30)}${formData.message.length > 30 ? '...' : ''}` 
    };
    logEvent('form-submit', { form: 'contact', values: loggedData });
    
    // In a real application, you would send the full formData to a server here.
    console.log('Form Submitted:', formData);
    
    setIsSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-cover bg-center" style={{backgroundImage: "url('/images/contact/background.jpg')"}}>
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('contactPage.title')}</h1>
                    <p className="mt-4 text-lg text-stone-600">
                        {t('contactPage.description')}
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="text-center p-8 bg-emerald-50 rounded-lg">
                        <h2 className="text-2xl font-bold text-emerald-800">{t('contactPage.success.title')}</h2>
                        <p className="mt-2 text-stone-700">{t('contactPage.success.message')}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">{t('contactPage.form.name')}</label>
                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">{t('contactPage.form.email')}</label>
                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="pax" className="block text-sm font-medium text-stone-700 mb-1">{t('contactPage.form.pax')}</label>
                                <input type="number" name="pax" id="pax" min="1" value={formData.pax} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"/>
                            </div>
                            <div>
                                <label htmlFor="dates" className="block text-sm font-medium text-stone-700 mb-1">{t('contactPage.form.dates')}</label>
                                <input type="text" name="dates" id="dates" placeholder={t('contactPage.form.datesPlaceholder')} value={formData.dates} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">{t('contactPage.form.message')}</label>
                            <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-800 transition-colors duration-300 shadow-md text-lg">
                                {t('contactPage.form.submit')}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    </div>
  );
};

export default ContactPage;