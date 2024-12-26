// routes/policyRoutes.js
const express = require('express');
const PolicyModel = require('../model/PolicyModel');
const validatePolicy = require('../middleware/validatePolicy');

const router = express.Router();

router.post('/policies', validatePolicy, async (req, res) => {
    try {
        const policy = PolicyModel.create(req.body);
        res.status(201).send({ policy });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/policyUserList', async (req, res) => {
    try {
        const policyDetails = await PolicyModel.find();
        res.status(200).send({ policyDetails });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/policies/:id', async (req, res) => {
    try {
        const policy = await PolicyModel.findById(req.params.id);
        if (!policy) return res.status(404).send({ error: 'Policy not found' });

        const illustration = generateIllustration(policy);
        res.status(200).send({ policy, illustration });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Logic to generate illustration data
function generateIllustration(policy) {
    const { modalPremium, pt, ppt, sumAssured } = policy;
    const bonusRates = [2.5, 3, 3.5, 3.5, 3.5, 3.5, 3, 3, 3, 3, 3, 2.5, 3, 3, 2.5, 5, 4, 4.5, 4, 25];
    const illustration = [];
    let totalBenefit = 0;

    for (let i = 1; i <= pt; i++) {
        const bonusRate = bonusRates[i - 1] || 0;
        const bonusAmount = modalPremium * (bonusRate / 100);
        const cashflow = i <= ppt ? -modalPremium : 0;

        illustration.push({
            year: i,
            premium: i <= ppt ? modalPremium : 0,
            bonusRate: bonusRate,
            bonusAmount: bonusAmount,
            totalBenefit: totalBenefit + bonusAmount,
            netCashflow: cashflow + totalBenefit + bonusAmount,
        });
    }

    return illustration;
}

module.exports = router;
