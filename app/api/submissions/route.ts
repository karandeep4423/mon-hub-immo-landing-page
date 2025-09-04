import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import FormSubmission from '../../../lib/models/FormSubmission';

// CORS headers for cross-domain requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sortBy') || 'submittedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const search = searchParams.get('search') || '';

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build search query
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { network: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute queries in parallel
    const [submissions, totalCount] = await Promise.all([
      FormSubmission.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      FormSubmission.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: {
        submissions,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit,
          skip
        },
        filters: {
          search,
          sortBy,
          sortOrder
        }
      }
    }, {
      headers: corsHeaders,
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des données'
    }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// GET endpoint for fetching submission statistics
export async function HEAD(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Get statistics
    const totalSubmissions = await FormSubmission.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySubmissions = await FormSubmission.countDocuments({
      submittedAt: { $gte: today }
    });

    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const weekSubmissions = await FormSubmission.countDocuments({
      submittedAt: { $gte: thisWeek }
    });

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    const monthSubmissions = await FormSubmission.countDocuments({
      submittedAt: { $gte: thisMonth }
    });

    return NextResponse.json({
      success: true,
      stats: {
        total: totalSubmissions,
        today: todaySubmissions,
        thisWeek: weekSubmissions,
        thisMonth: monthSubmissions
      }
    }, {
      headers: corsHeaders,
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques'
    }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}
