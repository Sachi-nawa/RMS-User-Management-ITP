import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Changed import

function UpdateF() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate(); // Changed hook
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/user/${id}`);
                setInputs(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:8070/user/update/${id}`, inputs);
            navigate('/'); // Redirect to the homepage after successful update
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Update</h1>
            <form onSubmit={sendRequest}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={inputs.username || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                        type="text"
                        id="contact_number"
                        name="contact_number"
                        value={inputs.contact_number || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={inputs.address || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={inputs.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
}

export default UpdateF;
