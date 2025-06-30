import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios({
          method: SummaryApi.verify_email.method,
          url: baseURL + SummaryApi.verify_email.url,
          data: { code },
        });

        alert("Email verified successfully!");
        navigate("/login");
      } catch (err) {
        console.error(err);
        alert(
          err?.response?.data?.message ||
          "Verification failed. Please try again."
        );
        navigate("/login");
      }
    };

    if (code) {
      verify();
    }
  }, [code, navigate]);

  return <p>Verifying your email...</p>;
}

export default VerifyEmail;
