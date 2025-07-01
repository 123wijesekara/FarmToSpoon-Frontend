import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import Axios from '../utils/Axios'; // ✅ Your custom Axios instance
import SummaryApi from '../common/SummaryApi';
import mailImage from '../assets/logof.png';
import '../pages/VerifyEmail.css';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.verify_email,   
          data: { code },             
        });
 
        if (response.data.success) {
          console.log("Email verification success:", response.data.message);
        }

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        console.error("Verification failed:", err);
        alert(
          err?.response?.data?.message || 'Verification failed. Please try again.'
        );
        navigate('/login');
      }
    };

    if (code) {
      verify();
    }
  }, [code, navigate]);

  return (
    <div className="verify-email-container">
      <div className="verify-email-left">
        
      </div>
      <div className="verify-email-right">
        <FaEnvelopeOpenText size={50} color="#22c55e" />
        <h2>Email Verified</h2>
        <p>Thank you for verifying your email address.</p>
        <p>Please check your Gmail inbox for confirmation.</p>
    
      </div>
    </div>
  );
}

export default VerifyEmail;
