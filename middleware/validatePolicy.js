const validatePolicy = (req, res, next) => {
    const { dob, sumAssured, modalPremium, pt, ppt, premiumFrequency } = req.body;
    
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    
    if (age < 23 || age > 56) 
            return res.status(400).send({ message: 'Age must be between 23 and 56' });
        if (pt < 10 || pt > 20) 
            return res.status(400).send({ message: 'PT must be between 10 and 20' });
        if (ppt < 5 || ppt > 10) 
            return res.status(400).send({ message: 'PPT must be between 5 and 10' });
        // if (pt <= ppt) 
        //     return res.status(400).send({ message: 'PT must be greater than PPT' });
        if (modalPremium < 10000 || modalPremium > 50000) 
            return res.status(400).send({ message: 'Premium must be between 10,000 and 50,000' });
        if (!['Yearly', 'Half-Yearly', 'Monthly'].includes(premiumFrequency))
            return res.status(400).send({ message: 'Invalid premium frequency' });
        
        // if (sumAssured < Math.max(modalPremium * 10, 5000000))
        //     return res.status(400).send({ message: 'Invalid sum assured value' });
        
        next();
    };
    
module.exports = validatePolicy;  